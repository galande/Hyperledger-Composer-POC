/**
 * This transaction will create flight
 * @param {org.acme.airline.flight.CreateFlight} flightInfo
 * @transaction
 */

function createFlight(flightInfo){
    var ns = 'org.acme.airline.flight';
   return getAssetRegistry(ns + '.Flight')
   .then(function (flightRegistry) {
       var factory = getFactory();
       var dateString = flightInfo.scheduleTimestamp.toISOString().substr(0,10);   
       var id = flightInfo.flightNumber + '-' + dateString;
       var flight = factory.newResource(ns, 'Flight', id);
       var flightRoute = factory.newConcept(ns, 'Route');
       flight.flightNumber = flightInfo.flightNumber;
       flightRoute.sourceAddress = flightInfo.sourceAddress;
       flightRoute.destinationAddress = flightInfo.destinationAddress;
       flightRoute.scheduleTimestamp = flightInfo.scheduleTimestamp;
       flight.route = flightRoute;
       alias = 'BU476';
       flight.aliasFlightNumbers= [alias];

       return flightRegistry.addAll([flight]);
   }) 
}