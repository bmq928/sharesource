export const transformErrorResponse = (resp: any) => {
  const data = resp?.data
  if (!data?.error) return data

  const message = data?.message
  return Array.isArray(message) ? message[0] : message
}
