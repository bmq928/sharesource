'use client'

import type { CreateTaskDto, UpdateTaskDto } from '@libs/be-core'
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useListTasksQuery,
  useUpdateTaskMutation,
} from '@libs/fe-core'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function Page() {
  const { data } = useListTasksQuery({})
  const [doCreateTask, { error: createTaskErr }] = useCreateTaskMutation()
  const [doUpdateTask, { error: updateTaskErr }] = useUpdateTaskMutation()
  const [doDeleteTask, { error: delTaskErr }] = useDeleteTaskMutation()
  const [creating, setCreating] = useState(false)
  const {
    handleSubmit,
    control,
    formState: { errors: formErr },
  } = useForm<CreateTaskDto | UpdateTaskDto>()

  const rows = useMemo(
    () =>
      creating
        ? [
            ...(data?.data ?? []).map((row) => ({ ...row, editable: false })),
            { id: '', name: '', description: '', status: '', editable: true },
          ]
        : (data?.data ?? []).map((row) => ({ ...row, editable: false })),
    [creating, data]
  )

  return (
    <>
      <Button onClick={() => setCreating(true)}>New</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
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
                  {row.editable ? (
                    <Controller
                      name="name"
                      defaultValue=""
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
                  {row.editable ? (
                    <Controller
                      name="description"
                      defaultValue=""
                      control={control}
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
                  {row.editable ? (
                    <Controller
                      name="status"
                      defaultValue={'pending' as any}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size="small"
                          margin="normal"
                          fullWidth
                          autoComplete={row.status}
                          autoFocus
                          {...field}
                        />
                      )}
                    />
                  ) : (
                    row.status
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={handleSubmit(
                      (creating ? doCreateTask : doUpdateTask) as any
                    )}
                  >
                    Save
                  </Button>
                  <Button onClick={() => doDeleteTask({ id: row.id })}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
