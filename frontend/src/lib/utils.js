import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export default async function request(
  action,
  data,
  queryParam,
  method = 'POST'
) {
  const { AJAX_URL, NONCE, ROUTE_PREFIX } = config
  const uri = new URL(AJAX_URL)
  uri.searchParams.append('action', `${ROUTE_PREFIX}${action}`)
  uri.searchParams.append('_ajax_nonce', NONCE)

  if (queryParam !== null) {
    for (const key in queryParam) {
      if (key) {
        uri.searchParams.append(key, queryParam[key].toString())
      }
    }
  }

  const options = {
    headers: {},
    method
  }

  if (method.toLowerCase() === 'post') {
    options.body = data instanceof FormData ? data : JSON.stringify(data)
  }

  return (await fetch(uri, options).then(res => res.json()))
}
