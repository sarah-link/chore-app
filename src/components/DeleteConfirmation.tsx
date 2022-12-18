import { AlertDialog, Button, Text, useColorModeValue } from 'native-base'
import React, { Dispatch, SetStateAction } from 'react'
import { getBgColorPrimary } from '../Theme'

interface DeleteConfirmationProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  name: string
  onConfirm: () => void
}

function DeleteConfirmation(props: DeleteConfirmationProps) {
  const onConfirm = () => props.onConfirm()
  const onCancel = () => props.setIsOpen(false)
  // TODO: learn about this
  const cancelRef = React.useRef(null)

  let bg = getBgColorPrimary()

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={props.isOpen}
      onClose={onCancel}
      _backdrop={'white.500'}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton onPress={onCancel} />
        <AlertDialog.Header bg={bg}>Confirm Deletion</AlertDialog.Header>
        <AlertDialog.Body bg={bg}>
          <Text>
            Are you sure you want to delete{' '}
            <Text fontWeight={'bold'}>{props.name}</Text>? This cannot be
            undone.
          </Text>
        </AlertDialog.Body>
        <AlertDialog.Footer justifyContent={'space-between'} bg={bg}>
          <Button
            _text={{
              color: useColorModeValue('black', 'white'),
            }}
            bg={useColorModeValue('gray.300', 'gray.500')}
            onPress={() => onCancel()}
          >
            Cancel
          </Button>
          <Button
            bg={'danger.500'}
            onPress={() => {
              props.setIsOpen(false)
              onConfirm()
            }}
          >
            Yes, delete
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}

export default DeleteConfirmation
