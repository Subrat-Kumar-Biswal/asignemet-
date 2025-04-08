import React from 'react'

const Logout = () => {
  return (
    <button
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit}
          className={`w-full py-2 px-4 rounded text-white ${
            isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

  )
}

export default Logout