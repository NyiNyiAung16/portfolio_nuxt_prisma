import { useToast } from "~/components/ui/toast";

const { toast } = useToast();

export const setToast = ({
  title,
  description,
  duration = 2000,
  type = "background",
  variant = "default",
}) => toast({ title, description, duration, type, variant });

export const setErrorToast = (e) => setToast({
  title: e.message,
  description: e.response?.statusText || "Something went wrong",
  duration: 2000,
  type: "background",
  variant: "destructive",
});
