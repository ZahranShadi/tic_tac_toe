import { useState, useEffect } from 'react';

type UseAsyncOperationResult = {
    loading: boolean;
    error: string | null;
    handleAsyncOperation: (
        asyncOperation: () => Promise<void>,
        errorMessage: string,
        shouldSetLoading?: boolean
    ) => Promise<void>;
    resetError: () => void;
};

export const useAsyncOperation = (): UseAsyncOperationResult => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAsyncOperation = async (
        asyncOperation: () => Promise<void>,
        errorMessage: string,
        shouldSetLoading: boolean = true
    ): Promise<void> => {
        try {
            if (shouldSetLoading) {
                setLoading(true);
            }
            setError(null);

            await asyncOperation();
        } catch (error) {
            setError(errorMessage);
        } finally {
            if (shouldSetLoading) {
                setLoading(false);
            }
        }
    };

    const resetError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            setLoading(false);
            setError(null);
        };
    }, []);

    return { loading, error, handleAsyncOperation, resetError };
};
