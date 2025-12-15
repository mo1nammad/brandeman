import { toast } from "sonner";

export const toastAuthError = (error: Error) => {
  const messages: Record<string, string> = {
    "Invalid email or password": "ایمیل یا رمز کاربری اشتباه وارد شده است",
  };

  const message = messages[error.message]
    ? messages[error.message]
    : error.message;

  toast.error(message);
};
