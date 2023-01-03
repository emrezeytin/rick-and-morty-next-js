import { useState } from "react";
import {
	AppShell,
	Navbar,
	Header,
	Text,
	MediaQuery,
	Burger,
	useMantineTheme,
	MantineProvider,
	NavLink,
} from "@mantine/core";
import type { AppProps } from "next/app";
import {
	IconDeviceTv,
	IconHome2,
	IconLayoutList,
	IconLocation,
	IconMapPin,
	IconSettings,
	IconUsers,
} from "@tabler/icons";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";

export default function App({ Component, pageProps }: AppProps) {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{ colorScheme: "dark" }}
		>
			<AppShell
				styles={{
					main: {
						background: theme.colors.dark[8],
					},
				}}
				navbarOffsetBreakpoint="sm"
				navbar={
					<Navbar
						p="md"
						hiddenBreakpoint="sm"
						hidden={!opened}
						width={{ base: 200 }}
						height="100vh"
					>
						<NavLink
							label="Home"
							component="a"
							href="/"
							icon={
								<IconHome2
									size={16}
									stroke={1.5}
								/>
							}
						/>
						<NavLink
							label="Characters"
							component="a"
							href="/characters"
							icon={
								<IconUsers
									size={16}
									stroke={1.5}
								/>
							}
						/>
						<NavLink
							label="Locations"
							component="a"
							href="/locations"
							icon={
								<IconMapPin
									size={16}
									stroke={1.5}
								/>
							}
						/>
						<NavLink
							label="Episodes"
							component="a"
							href="/episodes"
							icon={
								<IconDeviceTv
									size={16}
									stroke={1.5}
								/>
							}
						/>
						<NavLink
							label="My Lists"
							component="a"
							href="/lists"
							icon={
								<IconLayoutList
									size={16}
									stroke={1.5}
								/>
							}
						/>
						<NavLink
							label="Settings"
							component="a"
							href="/settings"
							icon={
								<IconSettings
									size={16}
									stroke={1.5}
								/>
							}
						/>
					</Navbar>
				}
				header={
					<MediaQuery
						largerThan="sm"
						styles={{ display: "none" }}
					>
						<Header
							height={{ base: 50, sm: "auto" }}
							p="md"
						>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "flex-end",
									height: "100%",
								}}
							>
								<Burger
									opened={opened}
									onClick={() => setOpened((o) => !o)}
									size="sm"
									color={theme.colors.gray[6]}
									mr="xl"
								/>
								<Text>Application header</Text>
							</div>
						</Header>
					</MediaQuery>
				}
			>
				<ApolloProvider client={client}>
					<Component {...pageProps} />
				</ApolloProvider>
			</AppShell>
		</MantineProvider>
	);
}
