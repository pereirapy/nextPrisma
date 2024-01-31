import { IS_DEV } from '@/utils/constants';

import { Dictionary } from '@/types/app';
import { toast } from '@/components/ui/use-toast';

type ToastMessageErrorProps = {
  dictionary: Dictionary;
  errorMessage: string;
};

const getDescription = ({
  errorMessage,
  dictionary,
}: ToastMessageErrorProps) => {
  if (IS_DEV) {
    return !(errorMessage in dictionary.common)
      ? errorMessage
      : // @ts-ignore
        dictionary.common[errorMessage];
  }
  return errorMessage in dictionary.common
    ? // @ts-ignore
      dictionary.common[errorMessage]
    : // @ts-ignore
      dictionary.common['toast.error.description'];
};

export const toastMessageError = ({
  errorMessage,
  dictionary,
}: ToastMessageErrorProps) => {
  toast({
    variant: 'destructive',
    // @ts-ignore
    title: dictionary.common['toast.error.title'],
    description: getDescription({ errorMessage, dictionary }),
  });
};
