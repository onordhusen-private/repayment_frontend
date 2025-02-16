import {
    AppBar,
    Container,
    Toolbar,
    Typography
} from '@mui/material';
import {TEXT_COMPANY_NAME} from '@/constants/texts/RepaymentTexts';

/**
 * Eine einfache Navbar.
 * 
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export default function NavBarSurface() {
    return (
        <AppBar position='fixed'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        variant='h6'
                        noWrap
                        sx={{mr: 2}}
                    >
                        {TEXT_COMPANY_NAME}
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
