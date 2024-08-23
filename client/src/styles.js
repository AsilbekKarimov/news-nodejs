import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 50px',
    backgroundColor: 'rgb(27,10,127)', // Change this to your desired color
    color: '#fff',
  },
  heading: {
    color: 'rgba(255,183,77, 1)',
    fontFamily: 'Cursive',
  },
  image: {
    marginLeft: '15px',
  },
}));
