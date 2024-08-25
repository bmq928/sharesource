'use client'

import type { CreateTaskDto, UpdateTaskDto } from '@libs/be-core'
import {
  Nav,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useListTasksQuery,
  useUpdateTaskMutation,
} from '@libs/fe-core'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function Page() {
  const { data } = useListTasksQuery({ sortBy: 'createdAt' })
  const [doCreateTask] = useCreateTaskMutation()
  const [doUpdateTask] = useUpdateTaskMutation()
  const [doDeleteTask] = useDeleteTaskMutation()
  const [creating, setCreating] = useState(false)
  const [updatingRowId, setUpdatingRowId] = useState('')
  const {
    handleSubmit,
    control,
    formState: { isSubmitted },
    reset: formReset,
  } = useForm<(CreateTaskDto | UpdateTaskDto) & { status?: boolean }>()
  const rows = useMemo(
    () =>
      creating
        ? [
            { id: '', name: '', description: '', status: null, new: true },
            ...(data?.data ?? []).map((row) => ({ ...row, new: false })),
          ]
        : (data?.data ?? []).map((row) => ({ ...row, new: false })),
    [creating, data]
  )
  const isEditingRow = (row: any) => row.id === updatingRowId || row.new

  useEffect(() => {
    formReset()
  }, [isSubmitted, formReset])

  return (
    <>
      <Nav />
      <Button onClick={() => setCreating(true)} startIcon={<AddIcon />}>
        New
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {isEditingRow(row) ? (
                    <Controller
                      name="name"
                      defaultValue={row.name}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size="small"
                          margin="normal"
                          fullWidth
                          autoComplete={row.name}
                          autoFocus
                          {...field}
                        />
                      )}
                    />
                  ) : (
                    row.name
                  )}
                </TableCell>
                <TableCell>
                  {isEditingRow(row) ? (
                    <Controller
                      name="description"
                      control={control}
                      defaultValue={row.description}
                      render={({ field }) => (
                        <TextField
                          size="small"
                          margin="normal"
                          fullWidth
                          autoComplete={row.description}
                          autoFocus
                          {...field}
                        />
                      )}
                    />
                  ) : (
                    row.description
                  )}
                </TableCell>
                <TableCell>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        defaultChecked={row.status === 'completed'}
                        disabled={!isEditingRow(row)}
                        {...field}
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  {(row.new || updatingRowId === row.id) && (
                    <Button
                      onClick={handleSubmit(
                        row.new
                          ? (val) =>
                              doCreateTask({
                                ...val,
                                name: val.name ?? '',
                                description: val.description ?? '',
                                status: val.status
                                  ? 'completed'
                                  : ('pending' as any),
                              })
                          : updatingRowId === row.id
                          ? (val) =>
                              doUpdateTask({
                                ...val,
                                id: row.id,
                                status: val.status
                                  ? 'completed'
                                  : ('pending' as any),
                              }).then(() => setUpdatingRowId(''))
                          : () => null
                      )}
                    >
                      Save
                    </Button>
                  )}
                  {isEditingRow(row) && (
                    <Button
                      onClick={() => {
                        if (row.new) setCreating(false)
                        if (row.id === updatingRowId) setUpdatingRowId('')
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                  {!row.new && updatingRowId !== row.id && (
                    <>
                      <Button
                        onClick={() => {
                          setUpdatingRowId(row.id)
                          formReset()
                        }}
                      >
                        Update
                      </Button>
                      <Button onClick={() => doDeleteTask({ id: row.id })}>
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
