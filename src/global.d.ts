interface RequestHookType<T = any> {
    error?: boolean
    loading?: boolean
    message?: string | null
    data?: T | null
}

interface Google {
    accounts: {
        id: {
            initialize: (input: IdConfiguration) => void;
            prompt: (
                momentListener?: (res: PromptMomentNotification) => void
            ) => void;
            renderButton: (
                parent: HTMLElement,
                options: GsiButtonConfiguration
            ) => void;
            disableAutoSelect: () => void;
            storeCredential: (credentials: Credential, callback: () => void) => void;
            cancel: () => void;
            onGoogleLibraryLoad: () => void;
            revoke: (
                hint: string,
                callback: (done: RevocationResponse) => void
            ) => void;
        };
    };
}

interface Window {
    google?: Google
}

interface API_RESPONSE<T = any> {
    status?: boolean
    message?: string
    data?: T
}