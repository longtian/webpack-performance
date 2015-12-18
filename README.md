# webpack-performance
A webpack plugin to record important metrics during the building progress.

**alpha version**

## Dependency

* InfluxDB to record time series data
* Graphana to show grah

## Example

You can download the dashboard configuration file [here](./doc/DashboardDefinition.json).

Track assets whole package size

![](./doc/assets.png)

Track build time

![](./doc/build_time.png)

Track modules dependencies

![](./doc/modules.png)

Track profiling infomation

![](./doc/profile.png)

## License

MIT

