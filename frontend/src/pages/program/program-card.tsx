import { Card, CardContent, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { Program } from '@/app/types/Program';

interface ProgramCardProps {
  program: Program;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => (
  <Card sx={{ width: '100%', height: '100%' }}>
    <CardContent>
      <Typography variant="h6">{program.title}</Typography>
      <Typography variant="body2">{program.content.slice(0, 30)}...</Typography>
      <Typography variant="body2">Modules: {program.modules.length}</Typography>
      <Link href={`/program/${program.id}`} passHref>
        <Button variant="text" color="primary">
          View Program
        </Button>
      </Link>
    </CardContent>
  </Card>
);

export default ProgramCard;
