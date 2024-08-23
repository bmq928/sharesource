'use client'

import CancelIcon from '@mui/icons-material/Cancel'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowModes,
  GridRowModesModel,
} from '@mui/x-data-grid'
import { useState } from 'react'

export default function Page() {
  const [rows] = useState([{ id: 1, name: '1', description: '1' }])
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
    />
  )
}
