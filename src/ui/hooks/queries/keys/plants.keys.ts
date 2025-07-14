export const plantsQueryKeys = {
   all: ['plants'] as const,
   byEnvironment: (environmentId: number) => [...plantsQueryKeys.all, 'byEnvironment', environmentId] as const,
};
