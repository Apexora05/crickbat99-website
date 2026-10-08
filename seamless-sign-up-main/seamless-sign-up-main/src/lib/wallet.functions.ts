import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const DepositSchema = z.object({
  method: z.enum(["UPI", "Paytm", "Bank Transfer", "Crypto"]),
  amount_inr: z.number().int().min(100).max(500000),
  reference: z.string().max(120).optional(),
});

const WithdrawalSchema = z.object({
  method: z.enum(["UPI", "Paytm", "Bank Transfer", "Crypto"]),
  amount_inr: z.number().int().min(500).max(500000),
  upi_or_account: z.string().min(4).max(120),
});

export const createDeposit = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => DepositSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("transactions")
      .insert({
        user_id: userId,
        type: "deposit",
        method: data.method,
        amount_inr: data.amount_inr,
        reference: data.reference ?? null,
        status: "pending",
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const createWithdrawal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => WithdrawalSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("transactions")
      .insert({
        user_id: userId,
        type: "withdrawal",
        method: data.method,
        amount_inr: data.amount_inr,
        upi_or_account: data.upi_or_account,
        status: "pending",
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const listMyTransactions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("transactions")
      .select("id, type, method, amount_inr, status, reference, upi_or_account, created_at, updated_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw new Error(error.message);
    return data ?? [];
  });
