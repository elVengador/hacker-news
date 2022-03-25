export const fetchUtil = () => {
    const GET = async <R extends unknown>(url: string): Promise<R> => {
        const res = await fetch(url)
        if (res.status !== 200) { throw Error(`server error:${res.status}`) }

        return await res.json()
    }

    return { GET }
}