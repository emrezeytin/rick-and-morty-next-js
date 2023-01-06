import {
	Badge,
	Image,
	Text,
	Title,
	Card,
	Grid,
	LoadingOverlay,
} from "@mantine/core";
import { SINGLE_LOCATION_QUERY } from "lib/apolloQueries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function Location() {
	const router = useRouter();
	const locationId = router.query.id;
	const { data, loading } = useQuery(SINGLE_LOCATION_QUERY, {
		variables: { id: locationId as ID },
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
				<Grid.Col span={12}>
					<Title order={1}>{data?.location?.name} - {data?.location?.type}</Title>
				</Grid.Col>
			</Grid>
		</>
	);
};
