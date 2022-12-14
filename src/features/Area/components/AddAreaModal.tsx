import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  Text,
  WarningOutlineIcon,
} from 'native-base'
import React, { useState } from 'react'

export interface AddAreaProps {
  saveNewArea: (newAreaName: string) => void
}

function AddAreaModal(props: AddAreaProps) {
  const [open, setOpen] = useState(false)
  const [newAreaName, setNewAreaName] = useState('')
  const [nameIsInvalid, setNameIsInvalid] = useState(false)

  const validateName = () => {
    setNewAreaName(newAreaName.trim())
    setNameIsInvalid(newAreaName.trim() === '')
    return !(newAreaName.trim() === '')
  }

  return (
    <>
      <Box w={'50%'} alignSelf={'center'} marginTop={5}>
        <Button
          bg={'primary.600'}
          variant={'subtle'}
          onPress={() => setOpen(true)}
        >
          <Text>New Room</Text>
        </Button>
      </Box>
      <Modal
        isOpen={open}
        onClose={() => {
          setNameIsInvalid(false)
          setOpen(false)
        }}
        safeAreaTop={true}
      >
        <Modal.Content maxWidth='350' marginBottom={'auto'} marginTop={10}>
          <Modal.CloseButton />
          <Modal.Header>Add Room</Modal.Header>
          <Modal.Body>
            <FormControl isRequired isInvalid={nameIsInvalid}>
              <FormControl.Label>Room Name</FormControl.Label>
              <Input
                value={newAreaName}
                placeholder={'Name'}
                onChangeText={(newName) => setNewAreaName(newName)}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size='xs' />}
              >
                Room name cannot be blank.
              </FormControl.ErrorMessage>
            </FormControl>
          </Modal.Body>
          <Modal.Footer justifyContent={'center'}>
            <Button
              paddingX={'20'}
              onPress={() => {
                if (validateName()) {
                  props.saveNewArea(newAreaName)
                  setNewAreaName('')
                  setOpen(false)
                }
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default AddAreaModal
