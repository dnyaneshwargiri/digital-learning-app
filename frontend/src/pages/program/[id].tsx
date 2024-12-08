// src/pages/programs/[id].tsx
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Typography, Button, Paper } from '@mui/material';
import { ProgramDetailsProps } from '@/app/types/ProgramDetailsProps';

const ProgramDetails = ({ program }: ProgramDetailsProps) => {
  const router = useRouter();

  if (!program) {
    return <Typography variant="h5">Program not found</Typography>;
  }

  return (
    <Paper style={{ padding: '20px', margin: '20px auto', maxWidth: '800px' }}>
      <Typography variant="h4" gutterBottom>
        {program.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {program.content}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Modules:
      </Typography>
      <ul>
        {program.modules.map((module, index) => (
          <li key={index}>
            <Typography variant="h6">{module.title}</Typography>
            <Typography variant="body2">{module.description}</Typography>
          </li>
        ))}
      </ul>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/')}
      >
        Back to Home
      </Button>
    </Paper>
  );
};

export default ProgramDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/programs/${id}?populate=modules`
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Failed to fetch program details');
    }

    return {
      props: {
        program: data.data, // Assuming the API returns the program in `data.data`
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        program: null,
      },
    };
  }
};
