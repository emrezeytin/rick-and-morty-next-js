import {
	Title,
	Card,
	Grid,
	Pagination,
	LoadingOverlay,
} from "@mantine/core";
import { useState } from "react";
import { ALL_LOCATIONS_QUERY } from "lib/apolloQueries";
import { useQuery } from "@apollo/client";
import Link from "next/link";

export default function Locations() {
	const [activePage, setPage] = useState(1);
	const { data, loading } = useQuery(ALL_LOCATIONS_QUERY, {
		variables: { page: activePage },
	});

	return (
		<>
			<LoadingOverlay
				visible={loading}
				overlayBlur={2}
			/>
			<Grid
				mt="md"
				gutter="md"
			>
				{data?.locations?.results?.map((item: any) => {
					return (
						<Grid.Col
							key={item.id}
							xs={6}
							sm={6}
							md={4}
							lg={3}
						>
							<Card
								component="article"
								radius={0}
								sx={(theme) => ({
									backgroundColor: theme.colors.dark[6],
								})}
							>
								<Title
									order={2}
									size="h4"
									mt="md"
								>
									{item.name} - {item.type}
								</Title>
                <Link href="/location/[id]" as={`/location/${item.id}`}>Detail</Link>
							</Card>
						</Grid.Col>
					);
				})}
			</Grid>
			<Pagination
				mt="lg"
				page={activePage}
				onChange={setPage}
				total={data?.locations?.info?.pages}
			/>
		</>
	);
}
