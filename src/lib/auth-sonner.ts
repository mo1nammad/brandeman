import { toast } from "sonner";
import { AuthError } from "@supabase/supabase-js";

export const toastAuthError = (error: AuthError) => {
  const messages: Record<string, string> = {
    "Email not confirmed": "حساب تایید نشده است لطفا ایمیل خود را چک کنید",
  };

  const message = messages[error.message]
    ? messages[error.message]
    : error.message;

  toast.error(message);
};
