import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
  type ErrorComponentProps
} from '@tanstack/react-router'

function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  const isRoot = useMatch({
    strict: false,
    select: state => state.id === rootRouteId
  })

  console.error(error)

  return (
    <div>
      <ErrorComponent error={error} />
      <button
        onClick={() => {
          router.invalidate()
        }}
      >
        Try Again
      </button>
      {isRoot ? (
        <Link to="/">Home</Link>
      ) : (
        <Link
          to="/"
          onClick={e => {
            e.preventDefault()
            window.history.back()
          }}
        >
          Go Back
        </Link>
      )}
    </div>
  )
}

export { DefaultCatchBoundary }
