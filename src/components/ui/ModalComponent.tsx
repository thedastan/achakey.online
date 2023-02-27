import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React, { FC, ReactNode } from 'react'

type IPorps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  headerText: string
}

const ModalComponent: FC<IPorps> = ({
  isOpen,
  onClose,
  children,
  headerText,
}) => {
  return (
    <>
      <Modal
        isCentered
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          bg="rgba(252,252,253,0.7)"
          maxW={['90%', '80%', '560px']}
          px={{ base: '0', md: '50px' }}
          py="20px"
          borderRadius="21px"
        >
          <ModalHeader
            textAlign="center"
            fontFamily="Roboto"
            fontWeight="700"
            fontSize={{ base: '28px', sm: '40px' }}
            color="#2A3654"
            lineHeight="40px"
          >
            {headerText}
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalComponent