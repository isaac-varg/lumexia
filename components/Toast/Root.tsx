import * as Toast from '@radix-ui/react-toast';


const ToastRoot = () => {
  return (
    <Toast.Provider swipeDirection='right'>
    <Toast.Root>
      <Toast.Title />
      <Toast.Description />
      <Toast.Close />
    </Toast.Root>

    <Toast.Viewport />
  </Toast.Provider>
  )
}

export default ToastRoot
