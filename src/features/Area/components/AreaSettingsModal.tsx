import { Button, FormControl, HamburgerIcon, Input, Modal } from 'native-base'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Area } from '../../../models/areaModels'
import { deleteArea, editAreaName } from '../../../store/areasSlice'

export interface AreaSettingsModalProps {
  area: Area
}

export function AreaSettingsModal(props: AreaSettingsModalProps) {
  const [open, setOpen] = React.useState(false)
  const [newAreaName, setNewAreaName] = React.useState(props.area.name)

  const dispatch = useDispatch()

  const changeName = () => {
    dispatch(editAreaName({ id: props.area.id, newName: newAreaName }))
  }

  const deleteThisArea = () => {
    dispatch(deleteArea(props.area.id))
  }

  return (
    <>
      <Button
        bg={'gray.300'}
        marginLeft={'auto'}
        variant={'subtle'}
        onPress={() => setOpen(true)}
      >
        <HamburgerIcon />
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
        <Modal.Content maxWidth='350' marginBottom={'auto'} marginTop={10}>
          <Modal.CloseButton />

          <Modal.Header>Manage Area</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Area Name</FormControl.Label>
              <Input
                value={newAreaName}
                onChangeText={(newName) => setNewAreaName(newName)}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer justifyContent={'flex-start'}>
            <Button
              bg={'red.500'}
              onPress={() => {
                deleteThisArea()
                setOpen(false)
              }}
            >
              Delete Area
            </Button>
            <Button
              paddingX={'20'}
              marginLeft={'auto'}
              onPress={() => {
                changeName()
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

export default AreaSettingsModal
