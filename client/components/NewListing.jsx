import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

return (
    <>
    <Container className = {classes.cardGrid} maxMWidth ="md">
        <Grid item >
            <Card className ={classes.card}>
                <CardMedia className = {classes.cardMedia}
                 image = "url here"
                 title = "new listing image"
                />
                <CardContent className = {classes.cardContent}>
                    <Typography>
                        
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    </Container>
    </>
)