import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal';



export const SideBarItem = ({ id, date, title, body, imageUrls=[] }) => {
    const dispatch = useDispatch()

    const onClickNote =()=> dispatch( setActiveNote({ id, date,title, body, imageUrls }) )

    const newTitle = useMemo( ()=>{
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title
    }, [ title ])

    const newBody = useMemo( ()=>{
        return body.length > 25
            ? body.substring(0, 25) + '...'
            : body
    }, [ body ])

  return (
    <ListItem key={ id } disablePadding onClick={onClickNote}>
        <ListItemButton>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ newTitle } />
                <ListItemText secondary={ newBody } />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
