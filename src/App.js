import './App.css';
import React from 'react';

function App() {
	const [metadata, setMetadata] = React.useState();

	React.useEffect(() => {
		const fetchMetadata = async () => {
			const res = await fetch('/api/v1/metadata/browse');
			const data = await res.json();
			setMetadata(data);
		};

		fetchMetadata();
	}, []);

	return (
		<div className="App">
			<h1>Home</h1>
			<ul data-cy="metadata-list">
				{metadata?.map((d) => {
					return (
						<li key={d.id}>
							{d.id} {d.serviceName}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default App;
