import { useToast } from "~/components/ui/toast";
import type SetToast from '~/types/SetToast';

const { toast } = useToast();

export const setToast = ({
  title,
  description,
  duration = 2000,
  type = "background",
  variant = "default"
}: SetToast) => toast({ title, description, duration, type, variant });

export const setErrorToast = (e: any) => setToast({
  title: e.message,
  description: e.response?.statusText || "Something went wrong",
  duration: 2000,
  type: "background",
  variant: "destructive",
});
