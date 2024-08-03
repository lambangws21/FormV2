import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Logo from '@/app/st_carolus.png';


const HeaderComponent = () => {
  return (
    <div className="container mx-auto p-5">
      <Card className="flex flex-col lg:flex-row items-center gap-4">
        <div className="w-full lg:w-1/5 md:w-2/5 hidden lg:block">
          <Image src={Logo} alt="logo" width={500} height={300} />
        </div>
        <CardContent className="flex flex-col items-center w-full lg:w-4/5 text-center">
          <h4 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            RUMAH SAKIT ST SINT CAROLUS JAKARTA PUSAT
          </h4>
          <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
            PANDUAN SERAH TERIMA INTRA OPERASI DI KAMAR OPERASI
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeaderComponent;
