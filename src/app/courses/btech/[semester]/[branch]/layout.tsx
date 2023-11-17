import { Metadata, ResolvingMetadata } from 'next';
import { FC, ReactNode } from 'react';

type Props = {
    params: { semester: string; branch: string };
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const semester = params.semester;
    const branch = params.branch;

    return {
        title: {
            default: `BTECH | ${semester} | ${branch}`,
            template: `SyllabusX | %s`,
        },
    };
}

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return <>{children}</>;
};

export default Layout;
