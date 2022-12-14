import { Feather } from '@expo/vector-icons'
import {
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  useContrastText,
  WarningOutlineIcon,
} from 'native-base'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import DeleteConfirmation from '../../../components/DeleteConfirmation'
import { Area } from '../../../models/areaModels'
import { deleteArea, editAreaName } from '../../../store/areasSlice'
import { getBgColorSecondary } from '../../../Theme'

export interface AreaSettingsModalProps {
  area: Area
}

export function AreaSettingsModal(props: AreaSettingsModalProps) {
  const [open, setOpen] = useState(false)
  const [newAreaName, setNewAreaName] = useState(props.area.name)
  const [nameIsInvalid, setNameIsInvalid] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  const dispatch = useDispatch()

  const changeName = () => {
    dispatch(editAreaName({ id: props.area.id, newName: newAreaName }))
  }

  const validateName = () => {
    setNewAreaName(newAreaName.trim())
    setNameIsInvalid(newAreaName.trim() === '')
    return !(newAreaName.trim() === '')
  }

  const deleteThisArea = () => {
    setOpen(false)
    dispatch(deleteArea(props.area.id))
  }

  return (
    <>
      <DeleteConfirmation
        isOpen={deleteConfirmOpen}
        setIsOpen={setDeleteConfirmOpen}
        name={props.area.name}
        onConfirm={deleteThisArea}
      ></DeleteConfirmation>
      <IconButton
        marginLeft={'auto'}
        variant={'ghost'}
        onPress={() => setOpen(true)}
        _icon={{
          as: Feather,
          name: 'edit-3',
          color: useContrastText(getBgColorSecondary()),
        }}
      />
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

          <Modal.Header>Manage Area</Modal.Header>
          <Modal.Body>
            <FormControl isInvalid={nameIsInvalid}>
              <FormControl.Label>Area Name</FormControl.Label>
              <Input
                value={newAreaName}
                onChangeText={(newName) => setNewAreaName(newName)}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size='xs' />}
              >
                Room name cannot be blank.
              </FormControl.ErrorMessage>
            </FormControl>
          </Modal.Body>
          <Modal.Footer justifyContent={'flex-start'}>
            <Button
              bg={'red.500'}
              onPress={() => {
                setDeleteConfirmOpen(true)
              }}
            >
              Delete Area
            </Button>
            <Button
              paddingX={'20'}
              marginLeft={'auto'}
              onPress={() => {
                if (validateName()) {
                  changeName()
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

export default AreaSettingsModal
