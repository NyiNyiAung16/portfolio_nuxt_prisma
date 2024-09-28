import { useToast } from "~/components/ui/toast";


const { toast } = useToast();

export const setToast = (data) => {
    toast({
        title: data.title,
        description: data.description,
        duration: data.duration || 2000,
        type:data.type || 'background',
        variant:data.variant || 'default',
    });
}