import { useRouter } from 'next/router'
import PreviewHeader from 'components/Preview/PreviewHeader'
import { GetProductByID } from 'redux/actions'
import { useEffect } from 'react'
import PreviewContent from 'components/Preview/PreviewContent'
import AuthLayout from 'components/authlayout'

// export default function PreviewProduct ({id}){
export default function PreviewProduct() {
  const router = useRouter()
  const getProductByID = GetProductByID()

  useEffect(() => {
    if (router.query.id) {
      getProductByID(router.query.id)
    }
  }, [router.query.id])

  if (!router.query.id) {
    return null
  }

  return (
    <>
      <div
        style={{
          position: 'absolute',
          background: '#e5e5e5',
          left: 0,
          top: 0,
          width: '100%',
        }}
      >
        <PreviewHeader id={router.query.id} showNavLinks={false} />
        <PreviewContent />
      </div>
    </>
  )
}

// export async function getServerSideProps({query: {id}}){
//     return {
//         props: {
//             id
//         }
//     }
// }
