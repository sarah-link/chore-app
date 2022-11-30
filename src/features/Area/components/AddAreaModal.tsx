import { Box, Button, FormControl, Input, Modal, Text } from 'native-base'
import React from 'react'

export interface AddAreaProps {
  saveNewArea: (newAreaName: string) => void
}

function AddAreaModal(props: AddAreaProps) {
  const [open, setOpen] = React.useState(false)
  const [newAreaName, setNewAreaName] = React.useState('')

  const openModal = () => {
    setOpen(true)
  }

  return (
    <>
      <Box w={'50%'} alignSelf={'center'} marginTop={5}>
        <Button
          bg={'primary.600'}
          variant={'subtle'}
          onPress={() => setOpen(true)}
        >
          <Text>New Area</Text>
        </Button>
      </Box>
      <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
        <Modal.Content maxWidth='350' marginBottom={'auto'} marginTop={10}>
          <Modal.CloseButton />
          <Modal.Header>Add Area</Modal.Header>
          <Modal.Body>
            <FormControl isRequired>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                value={newAreaName}
                onChangeText={(newName) => setNewAreaName(newName)}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer justifyContent={'center'}>
            <Button
              paddingX={'20'}
              onPress={() => {
                props.saveNewArea(newAreaName)
                setNewAreaName('')
                setOpen(false)
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
