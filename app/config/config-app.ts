
export const config: { 
    apiUrlAdvisors: string
    paginationPerPage: string
} = {
    apiUrlAdvisors: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/advisor',
    paginationPerPage: process.env.NEXT_PUBLIC_PAGINATION_VALUE || '3'
};
