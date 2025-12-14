import { toast } from "sonner";
import { AuthError } from "@supabase/supabase-js";

export const toastAuthError = (error: AuthError) => {
  console.log();

  const messages: Record<string, string> = {
    "Email not confirmed": "حساب تایید نشده است لطفا ایمیل خود را چک کنید",
  };

  toast.error(messages[error.message]);
};
