import { unstable_createMuiStrictModeTheme as createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const globalTheme = createMuiTheme({
    palette: {},
    typography: {
        useNextVariants: true,
    }
});

export default responsiveFontSizes(globalTheme);
