import { useState } from 'react';

type onCopyFn = (text: string) => Promise<boolean>;

function useCopyClipBoard(): [boolean, onCopyFn] {
    const [isCopy, setIsCopy] = useState<boolean>(false);

    const onCopy: onCopyFn = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopy(true);

            return true;
        } catch (error) {
            console.error(error);
            setIsCopy(false);

            return false;
        }
    };

    return [isCopy, onCopy];
}

export default useCopyClipBoard;
