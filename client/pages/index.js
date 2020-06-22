import axios from 'axios';

const LandingPage = ({currentUser}) => {
    console.log(currentUser)
    return <h1>Landing Page</h1>;

};

LandingPage.getInitialProps = async ({ req }) => {
   if (typeof window === 'undefined'){
       //we are on the server
       const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
           headers: req.headers
       });

   }else {
       const response = await axios.get('/api/users/currentuser');
       return response.data;
   }
   return {};
}

export default LandingPage;
