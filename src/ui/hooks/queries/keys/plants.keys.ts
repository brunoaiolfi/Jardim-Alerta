export const plantsQueryKeys = {
   all: ['plants'] as const,
   byEnvironment: (environmentId: string) => [...plantsQueryKeys.all, 'byEnvironment', environmentId] as const,
};
