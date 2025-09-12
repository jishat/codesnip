const SERVER_VARIABLES = window.codesnip_ || {}

const getServerVariable = (key, fallback, required = true) => {
    if (!key && fallback) return fallback
    if (!SERVER_VARIABLES || !(key in SERVER_VARIABLES) || !SERVER_VARIABLES?.[key]) {
      if (required && import.meta.env.MODE !== 'test') {
        console.error('🚥 Missing required server variable:', key)
      }
  
      if (fallback) return fallback
    }
  
    return SERVER_VARIABLES[key]
  }

  const config = {
    AJAX_URL: getServerVariable('ajax_url', 'http://.local/wp-admin/admin-ajax.php'),
    NONCE: getServerVariable('nonce', ''),
    ROUTE_PREFIX: getServerVariable('routePrefix', 'codesnip_', false),
  }

  export default config