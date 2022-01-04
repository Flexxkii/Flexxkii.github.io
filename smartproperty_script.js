var block_1 = $('#innergrid_2cf');
var block_2 = $('#innergrid_pe7');
var logo_block = $('#1065921513');

block_1.on('hover', function() {
	logo_block.attr('src', 'https://irp.cdn-website.com/5ec89aa2/dms3rep/multi/SP+Makelaardij+Logo.svg');
});

block_2.on('hover', function() {
	logo_block.attr('src', 'https://irp.cdn-website.com/5ec89aa2/dms3rep/multi/SP+Projecten+Logo.svg');
});

console.log('custom script loaded');