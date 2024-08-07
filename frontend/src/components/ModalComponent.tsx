import { Modal, ModalProps } from "@nextui-org/react"
import { useContext, useEffect, useState } from "react"
import { workspaceContext } from "../contexts/workspaceContext"

const ModalComponent = ({ ...props }: ModalProps) => {
  const { setModalsOpened, modalsOpened } = useContext(workspaceContext)

  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setIsModalOpen(!!props.isOpen)
  }, [props.isOpen])

  useEffect(() => {
    if (isModalOpen) {
      setModalsOpened((prev) => prev + 1)
    } else {
      setModalsOpened((prev) => prev - 1)
    }
  }, [isModalOpen, setModalsOpened])

  useEffect(() => {
    if (!isModalOpen) {
      setModalsOpened((prev) => prev + 1)
    }
    // Пустой массив зависимостей гарантирует, что этот эффект будет выполнен только один раз, после того как компонент был смонтирован
  }, [])

  return <Modal {...props}>{props.children}</Modal>
}

export default ModalComponent