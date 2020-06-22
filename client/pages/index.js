import axios from 'axios';

const LandingPage = ({currentUser}) => {
    console.log(currentUser)
    console.log(currentUser);
    return <h1>Landing Page</h1>;

};

LandingPage.getInitialProps = async () => {
   if (typeof window === 'undefined'){
       //we are on the server
       const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
           headers: {
               Host: 'ticketing.dev'
           }
       });

   }else {
       const response = await axios.get('/api/users/currentuser');
       return response.data;
   }
   return {};
}

export default LandingPage;
