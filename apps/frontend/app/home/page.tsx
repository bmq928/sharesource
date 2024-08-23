'use client'

import AddIcon from '@mui/icons-material/Add'
import CancelIcon from '@mui/icons-material/Cancel'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import Button from '@mui/material/Button'
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowModes,
  GridRowModesModel,
  GridSlots,
  GridToolbarContainer,
} from '@mui/x-data-grid'
import { useState } from 'react'

type ToolbarProps = {
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void
}
function Toolbar({ setRowModesModel }: ToolbarProps) {
  const id = Math.random()
  const handleClick = () => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }))
  }
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  )
}
export default function Page() {
  const [rows, setRows] = useState([{ id: 1, name: '1', description: '1' }])
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    {
      field: 'description',
      headerName: 'Description',
      width: 500,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={`${id}-Save`}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={() =>
                setRowModesModel((prev) => ({
                  ...prev,
                  [id]: { mode: GridRowModes.View },
                }))
              }
            />,
            <GridActionsCellItem
              key={`${id}-Cancel`}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={() =>
                setRowModesModel((prev) => ({
                  ...prev,
                  [id]: { mode: GridRowModes.View, ignoreModifications: true },
                }))
              }
              color="inherit"
            />,
          ]
        }

        return [
          <GridActionsCellItem
            key={`${id}-Edit`}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() =>
              setRowModesModel((prev) => ({
                ...prev,
                [id]: { mode: GridRowModes.Edit },
              }))
            }
            color="inherit"
          />,
          <GridActionsCellItem
            key={`${id}-Delete`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => console.log({ id })}
            color="inherit"
          />,
        ]
      },
    },
  ]

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowModesModel={rowModesModel}
      editMode="row"
      onRowModesModelChange={setRowModesModel}
      slots={{
        toolbar: Toolbar as GridSlots['toolbar'],
      }}
      slotProps={{
        toolbar: { setRowModesModel },
      }}
    />
  )
}
