import Link from 'next/link';

const NotFound = ({props}) => {
  return (
    <div
      style={{
        marginTop: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>{props.message}</h1>
      <h1>{props.statusCode}</h1>
      <h2>
        <Link href="/">
          <a style={{ color: 'blue', textDecoration: 'underline' }}>
            Go To Home Page
          </a>
        </Link>
      </h2>
      <p>Sorry, the content you are looking for cuould not be found.</p>
    </div>
  );
};

export default NotFound;
