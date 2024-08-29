import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography, IconButton } from '@mui/material';
import { ImageGallery } from '../components'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useRef } from 'react';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import deleteIcon from '../icons/delete.svg'


export const NoteView = () => {
    const { active:note, messageSaved, isSaving } = useSelector(state => state.journal)
    const dispatch = useDispatch()

    const { body, title, date, onInputChange, formState } = useForm( note )

    const dateString = useMemo(()=>{
        const newDate = new Date( date )
        return newDate.toUTCString()
    }, [date])

    const fileInputRef = useRef()

    useEffect(()=>{
        if (messageSaved.length > 0) Swal.fire('Nota actualizada', messageSaved, 'success')
    }, [messageSaved])

    useEffect(()=>{
        dispatch( setActiveNote(formState) )
    }, [formState])

    const onSaveNote =()=>{
        dispatch( startSaveNote() )
    }

    const onFileInputChange =({target})=>{
        if(target.files.length === 0) return

        dispatch( startUploadingFiles( target.files ) )
    }

    const onDelete =()=>{
        dispatch( startDeletingNote() )
        // Swal.fire('Nota eliminada', messageSaved,{ imageUrl: })
        Swal.fire({
            title: 'nota eliminada',
            text: 'la nota fue eliminada correctamente',
            imageUrl: deleteIcon,
            imageWidth: 80,
            imageHeight: 80,
            imageAlt: 'Descripción del ícono'
          });
    }

    return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{ dateString }</Typography>
        </Grid>
        <Grid item>

            <input 
                type="file"
                multiple
                onChange={onFileInputChange}
                style={{display:'none'}}
                ref={fileInputRef}
            />

            <IconButton 
                color='primary' 
                disabled={isSaving}
                onClick={()=> fileInputRef.current.click()}
            >
                <UploadOutlined />
            </IconButton>

            <Button 
                color="primary" 
                sx={{ padding: 2 }}
                onClick={onSaveNote}
                disabled={ isSaving ? true : false }
            >

                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
                name='title'
                value={ title }
                onChange={ onInputChange }
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                name='body'
                value={ body }
                onChange={ onInputChange }
            />
        </Grid>

        <Grid container justifyContent='end'>
            <Button 
                onClick={ onDelete } 
                sx={{ mt: 2 }} 
                color='error'
                disabled={ isSaving ? true : false }
            >
                <DeleteOutline />
                    Delete
            </Button>

        </Grid>

        {/* Image gallery */}
        <ImageGallery images={ note.imageUrls } />

    </Grid>
  )
}